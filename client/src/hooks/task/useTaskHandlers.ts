import { TaskProps } from '@shared/interfaces/task.interface';
import { useTaskState } from './useTaskState';
import { useParams } from 'react-router-dom';
import { useTaskStore } from '@/store/taskStore';
import { useListStore } from '@/store/listStore';
import { useModalStore } from '@/store/modalStore';
import { ChangeEvent, useCallback } from 'react';
import { updateList } from '@/services/listService';
import { updateListState } from '@/utils/updateListState';
import { MAX_TIMEOUT, SIZE_ID } from '@/constants/base';
import { nanoid } from 'nanoid';
import { updateTaskState } from '@/utils/updateTaskState';
import { requestAIDescription } from '@/services/requestAIDescription';
import { calculateHeight, resetHeight } from '@/utils/calculateHeight';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { createNotification } from '@/utils/createNotification';
import { UserAuth } from '@/context/AuthContext';
import { useNotificationsStore } from '@/store/notificationsStore';

// Hook para manejar los handlers de la tarea
export const useTaskHandlers = (
  task: TaskProps,
  state: ReturnType<typeof useTaskState>
) => {
  const { listId } = useParams();
  const { tasks, setTasks } = useTaskStore();
  const { lists, setLists } = useListStore();
  const { setIsOpen, setTask } = useModalStore();
  const { email } = UserAuth().user;
  const notificationsStore = useNotificationsStore();

  const updateTaskAndLists = useCallback(
    (updatedTasks: TaskProps[]) => {
      if (!listId) return;
      updateList(listId, { tasks: updatedTasks });
      setTasks(updatedTasks);
      setLists(updateListState(listId, lists, updatedTasks));
    },
    [listId, setLists, setTasks, lists]
  );

  const handleDuplicate = useCallback(() => {
    if (!listId) return;
    const newTask = { ...task, id: nanoid(SIZE_ID) };
    const updateTasks = [newTask, ...tasks];
    updateTaskAndLists(updateTasks);
  }, [task, listId, tasks]);

  const handleMoveTo = useCallback(
    (listIdMove?: string) => {
      if (!listId || !listIdMove) return;
      const removeTask = tasks.filter((t) => t.id !== task.id);
      setTasks(removeTask);

      const currentIndex = lists.findIndex((l) => l.listId === listId);
      const currentList = [...lists];

      if (currentIndex !== -1) {
        currentList[currentIndex].tasks = removeTask;
        updateList(listId, { tasks: removeTask });
      }

      const moveList = [...lists];
      const moveIndex = lists.findIndex((l) => l.listId === listIdMove);

      if (moveIndex !== -1) {
        moveList[moveIndex].tasks = [task, ...lists[moveIndex].tasks];
        updateList(listIdMove, { tasks: moveList[moveIndex].tasks });
      }
    },
    [task, listId, tasks]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!listId) return;
      e.preventDefault();
      e.stopPropagation();
      const updatedTasks = tasks.filter(
        (elem: TaskProps) => elem.id !== task.id
      );
      updateTaskAndLists(updatedTasks);
      createNotification(notificationsStore, email, {
        type: 'task',
        action: 'deleted',
        message: task.name,
        id: task.id,
      });
    },
    [listId, tasks, updateTaskAndLists]
  );

  const handleBlurDescription = () => {
    if (!listId || state.description === task.description) return;
    const { id } = task;
    const updateTasks = updateTaskState(id, tasks, {
      description: state.description,
    });
    updateTaskAndLists(updateTasks);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    state.setTaskName(e.target.value.trimStart());
    calculateHeight(state.textareaRef);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    state.setDescription(e.target.value.trimStart());
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    state.setChecked(e.target.checked);
    if (e.target.checked) {
      createNotification(notificationsStore, email, {
        type: 'task',
        action: 'completed',
        message: task.name,
        id: task.id,
      });
    }
  };

  const handleClicks = (e: React.MouseEvent) => {
    state.setCountClick(e.detail);
  };

  const handleDoubleClick = useCallback(() => {
    state.setIsFocused(true);
    setIsOpen(false);
    calculateHeight(state.textareaRef);
    if (state.textareaRef.current) state.textareaRef.current.focus();
  }, [setIsOpen, state.setIsFocused]);

  const handleClick = useCallback(() => {
    setIsOpen(true);

    setTask({ ...task, checked: state.checked });
  }, [task, state.checked, setIsOpen, setTask]);

  const handleTouchStart = useCallback(() => {
    if (state.isFocused) return;
    const currentTime = Date.now();
    state.setTouchStartTime(currentTime);
    const tapLength = currentTime - state.lastTapTime;
    state.setLastTapTime(
      tapLength < MAX_TIMEOUT && tapLength > 0 ? 0 : currentTime
    );
  }, [state.lastTapTime, state.isFocused]);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (state.isFocused) return;
      e.preventDefault();
      const touchDuration = Date.now() - state.touchStartTime;
      if (touchDuration < MAX_TIMEOUT) state.setCountClick((prev) => prev + 1);
    },
    [state.touchStartTime, state.isFocused]
  );

  const handleBlur = useCallback(() => {
    if (listId && state.taskName && state.taskName !== state.previousName) {
      const taskNameFormatted = replaceEmojis(state.taskName);
      const updatedTasks = updateTaskState(task.id, tasks, {
        name: taskNameFormatted,
      });
      state.setPreviousName(taskNameFormatted);
      state.setTaskName(taskNameFormatted);
      updateTaskAndLists(updatedTasks);
    } else {
      state.setTaskName(state.previousName);
    }
    state.setIsFocused(false);
    resetHeight(state.textareaRef);
  }, [listId, state.taskName, tasks]);

  const handleGenerateAIDescription = async () => {
    if (!listId || !state.taskName) return;
    try {
      state.setIsGeneratingAI(true);
      const newDescription = await requestAIDescription(
        state.taskName,
        state.description
      );
      const updatedTasks = updateTaskState(task.id, tasks, {
        description: newDescription,
      });
      state.setDescription(newDescription);
      updateTaskAndLists(updatedTasks);
    } catch (error) {
      console.error('Error generating AI description:', error);
    } finally {
      state.setIsGeneratingAI(false);
    }
  };

  return {
    updateTaskAndLists,
    handleDuplicate,
    handleMoveTo,
    handleDelete,
    handleBlurDescription,
    handleChange,
    handleChangeDescription,
    handleCheckboxChange,
    handleClicks,
    handleDoubleClick,
    handleClick,
    handleTouchStart,
    handleTouchEnd,
    handleBlur,
    handleGenerateAIDescription,
  };
};
