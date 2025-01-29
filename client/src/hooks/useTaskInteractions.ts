import {
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useTaskStore } from '@/store/taskStore';
import { useListStore } from '@/store/listStore';
import { useModalStore } from '@/store/modalStore';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useDebounce } from '@uidotdev/usehooks';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { calculateHeight, resetHeight } from '@/utils/calculateHeight';
import { format } from 'date-fns';
import { updateTaskState } from '@/utils/updateTaskState';
import { MAX_TIMEOUT } from '@/constants/base';
import { TaskProps } from '@shared/task.interface';
import { updateListState } from '@/utils/updateListState';

export const useTaskInteractions = (task: TaskProps, listId?: string) => {
  const { tasks, setTasks } = useTaskStore();
  const { lists, setLists } = useListStore();
  const { setIsOpen, setTask } = useModalStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null!);
  // States
  const [taskName, setTaskName] = useState(task.name);
  const [checked, setChecked] = useState(task.checked);
  const [isFocused, setIsFocused] = useState(false);
  const [previousName, setPreviousName] = useState(task.name);
  const [countClick, setCountClick] = useState(0);
  const [lastTapTime, setLastTapTime] = useState<number>(0);
  const [touchStartTime, setTouchStartTime] = useState<number>(0);
  // Derived states
  const deferredTaskName = useDeferredValue(taskName);
  const debouncedChecked = useDebounce(checked, 300);
  const debouncedCountClick = useDebounce(countClick, MAX_TIMEOUT);
  // Memoized handlers
  const updateTaskAndLists = useCallback(
    (updatedTasks: TaskProps[]) => {
      if (!listId) return;
      requestUpdateList(listId, { tasks: updatedTasks });
      setTasks(updatedTasks);
      setLists(updateListState(listId, lists, updatedTasks));
    },
    [listId, lists, setLists, setTasks]
  );

  const handleDelete = useCallback(() => {
    if (!listId) return;
    const updatedTasks = tasks.filter((elem: TaskProps) => elem.id !== task.id);
    updateTaskAndLists(updatedTasks);
  }, [listId, task.id, tasks, updateTaskAndLists]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskName(e.target.value.trimStart());
    calculateHeight(textareaRef);
  };

  const handleDoubleClick = useCallback(() => {
    setIsFocused(true);
    setIsOpen(false);
    calculateHeight(textareaRef);
    if (textareaRef.current) textareaRef.current.focus();
  }, [setIsOpen, setIsFocused]);

  const handleClick = useCallback(() => {
    setIsOpen(true);
    setTask({ ...task, checked });
  }, [task, checked, setIsOpen, setTask]);

  const handleTouchStart = useCallback(() => {
    if (isFocused) return;
    const currentTime = Date.now();
    setTouchStartTime(currentTime);
    const tapLength = currentTime - lastTapTime;
    setLastTapTime(tapLength < MAX_TIMEOUT && tapLength > 0 ? 0 : currentTime);
  }, [lastTapTime, isFocused]);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (isFocused) return;
      e.preventDefault();
      const touchDuration = Date.now() - touchStartTime;
      if (touchDuration < MAX_TIMEOUT) setCountClick((prev) => prev + 1);
    },
    [touchStartTime, isFocused]
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleBlur = useCallback(() => {
    if (listId && taskName && taskName !== previousName) {
      const taskNameFormatted = replaceEmojis(taskName);
      const updatedTasks = updateTaskState(task.id, tasks, {
        name: taskNameFormatted,
      });
      updateTaskAndLists(updatedTasks);
      setPreviousName(taskNameFormatted);
      setTaskName(taskNameFormatted);
    } else {
      setTaskName(previousName);
    }
    setIsFocused(false);
    resetHeight(textareaRef);
  }, [listId, taskName, previousName, task.id, tasks, updateTaskAndLists]);

  const handleClicks = (e: React.MouseEvent) => {
    setCountClick(e.detail);
  };

  useEffect(() => {
    if (!listId || debouncedChecked === task.checked) return;
    const updatedTasks = updateTaskState(task.id, tasks, {
      checked,
      date: format(new Date(), 'MM-dd-yyyy'),
    });
    updateTaskAndLists(updatedTasks);
  }, [debouncedChecked]);

  useEffect(() => {
    if (deferredTaskName === task.name) return;
    const taskNameFormatted = replaceEmojis(deferredTaskName);
    const updatedTasks = updateTaskState(task.id, tasks, {
      name: taskNameFormatted,
    });
    setTasks(updatedTasks);
  }, [deferredTaskName]);

  useEffect(() => {
    if (debouncedCountClick === 0) return;
    if (debouncedCountClick === 1 && !isFocused) handleClick();
    if (debouncedCountClick > 1) handleDoubleClick();
    setCountClick(0);
  }, [debouncedCountClick]);

  return {
    textareaRef,
    taskName,
    checked,
    isFocused,
    handleChange,
    handleBlur,
    handleDelete,
    handleCheckboxChange,
    handleClicks,
    handleTouchStart,
    handleTouchEnd,
  };
};
