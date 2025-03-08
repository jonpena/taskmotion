import { TaskProps } from "@shared/task.interface";
import { useTaskState } from "./useTaskState";
import { useParams } from "react-router-dom";
import { useTaskStore } from "@/store/taskStore";
import { useListStore } from "@/store/listStore";
import { useModalStore } from "@/store/modalStore";
import { ChangeEvent, useCallback } from "react";
import { requestUpdateList } from "@/services/requestUpdateList";
import { updateListState } from "@/utils/updateListState";
import { MAX_TIMEOUT, SIZE_ID } from "@/constants/base";
import { nanoid } from "nanoid";
import { updateTaskState } from "@/utils/updateTaskState";
import { requestAIDescription } from "@/services/requestAIDescription";
import { calculateHeight, resetHeight } from "@/utils/calculateHeight";
import { replaceEmojis } from "@/utils/replaceEmojis";

// Hook para manejar los handlers de la tarea
export const useTaskHandlers = (task: TaskProps, state: ReturnType<typeof useTaskState>) => {
  const { listId } = useParams();
  const { tasks, setTasks } = useTaskStore();
  const { lists, setLists } = useListStore();
  const { setIsOpen, setTask } = useModalStore();

  // Función utilitaria para actualizar tareas y listas
  const updateTaskAndLists = useCallback(
    (updatedTasks: TaskProps[]) => {
      if (!listId) return;
      requestUpdateList(listId, { tasks: updatedTasks });
      setTasks(updatedTasks);
      setLists(updateListState(listId, lists, updatedTasks));
    },
    [listId, setLists, setTasks, lists]
  );

  const handleDuplicate = useCallback(() => {
    if (!listId) return;
    const newTask = { ...task, id: nanoid(SIZE_ID) };
    const updateTasks = [newTask, ...tasks];
    requestUpdateList(listId, { tasks: updateTasks });
    setTasks(updateTasks);
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
        requestUpdateList(listId, { tasks: removeTask });
      }

      const moveList = [...lists];
      const moveIndex = lists.findIndex((l) => l.listId === listIdMove);

      if (moveIndex !== -1) {
        moveList[moveIndex].tasks = [task, ...lists[moveIndex].tasks];
        requestUpdateList(listIdMove, { tasks: moveList[moveIndex].tasks });
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
    },
    [listId, tasks, updateTaskAndLists]
  );

  const handleBlurDescription = () => {
    if (!listId || state.description === task.description) return;
    const { id } = task;
    const updateTasks = updateTaskState(id, tasks, { description: state.description });
    setTasks(updateTasks);
    requestUpdateList(listId, { tasks: updateTasks });
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
    state.setLastTapTime(tapLength < MAX_TIMEOUT && tapLength > 0 ? 0 : currentTime);
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
      setTasks(updatedTasks);
      state.setPreviousName(taskNameFormatted);
      state.setTaskName(taskNameFormatted);
    } else {
      state.setTaskName(state.previousName);
    }
    state.setIsFocused(false);
    resetHeight(state.textareaRef);
  }, [listId, state.taskName, tasks]);

  const handleGenerateAIDescription = async () => {
    if (!listId || !state.taskName) return;
    state.setIsGeneratingAI(true);
    try {
      const newDescription = await requestAIDescription(state.taskName);
      const updateTasks = updateTaskState(task.id, tasks, {
        description: newDescription,
      });
      state.setDescription(newDescription);
      setTasks(updateTasks);
      requestUpdateList(listId, { tasks: updateTasks });
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
    handleGenerateAIDescription
  };
};