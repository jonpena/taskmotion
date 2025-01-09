import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarButton } from '@/components/buttons/CalendarButton';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '@/store/modalStore';
import { useDebounce } from '@uidotdev/usehooks';
import { requestUpdateList } from '@/services/requestUpdateList';
import { useTaskStore } from '@/store/taskStore';
import { useParams } from 'react-router-dom';
import { replaceEmojis } from '@/utils/replaceEmojis';
import { mergeTaskUpdate } from '@/utils/mergeTaskUpdate';
import { requestAIDescription } from '@/services/requestAIDescription';
import { Textarea } from './ui/textarea';
import { calculateHeight } from '@/utils/calculateHeight';
import { Strikethrough } from './ui/strikethrough';
import { DrawerModal } from './ui/drawer';
import { IAButton } from './buttons/IAButton';

export const TaskDrawer = () => {
  const { task, isOpen, setIsOpen } = useModalStore();
  const [date, setDate] = useState(task.date ? task.date : undefined);
  const [description, setDescription] = useState(task.description);
  const { tasks, setTasks } = useTaskStore();
  const { listId } = useParams();
  const [checked, setChecked] = useState(task.checked);
  const debouncedChecked = useDebounce(checked, 300);
  const [previousName, setPreviousName] = useState(task.name);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const textareaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const [taskName, setTaskName] = useState(task.name);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskName(e.target.value.trimStart());
    calculateHeight(textareaRef);
  };

  const handleBlurTextarea = () => {
    if (listId && taskName !== previousName && taskName) {
      const newTaskName = replaceEmojis(taskName);
      const updateTasks = mergeTaskUpdate(task.id, tasks, {
        name: newTaskName,
      });
      setTasks(updateTasks);
      setTaskName(newTaskName);
      setPreviousName(newTaskName);
      requestUpdateList(listId, { tasks: updateTasks });
    } else setTaskName(previousName);
    textareaRef.current.style.height = 'auto';
  };

  const handleBlurDescription = () => {
    if (!listId || !description || description === task.description) return;
    const { id } = task;
    const updateTasks = mergeTaskUpdate(id, tasks, { description });
    setTasks(updateTasks);
    requestUpdateList(listId, { tasks: updateTasks });
  };

  const handleGenerateAIDescription = async () => {
    if (!listId || !taskName) return;
    setIsGeneratingAI(true);
    try {
      const newDescription = await requestAIDescription(taskName);
      const updateTasks = mergeTaskUpdate(task.id, tasks, {
        description: newDescription,
      });
      setDescription(newDescription);
      setTasks(updateTasks);
      requestUpdateList(listId, { tasks: updateTasks });
    } catch (error) {
      console.error('Error generating AI description:', error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleClickTextarea = () => calculateHeight(textareaRef);

  useEffect(() => {
    if (!listId || debouncedChecked === task.checked) return;
    const updateTasks = mergeTaskUpdate(task.id, tasks, { checked });
    setTasks(updateTasks);
    requestUpdateList(listId, { tasks: updateTasks });
  }, [debouncedChecked]);

  useEffect(() => {
    if (!listId || !date || date === task.date) return;
    const updateTasks = mergeTaskUpdate(task.id, tasks, {
      date: date as string,
    });
    setTasks(updateTasks);
    requestUpdateList(listId, { tasks: updateTasks });
  }, [date]);

  useEffect(() => {
    setTaskName(task.name);
    setChecked(task.checked);
    setDescription(task.description);
    setPreviousName(task.name);
  }, [task]);

  return (
    <DrawerModal open={isOpen} onClose={() => setIsOpen(false)}>
      <div
        className='w-full lg:max-w-[750px] lg:w-1/2 lg:min-w-[650px] h-full lg:min-h-max lg:h-[60%] bg-neutral-100 dark:bg-background  rounded-md shadow-lg border border-border  mx-auto mt-16 lg:mt-28'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between p-4 border-b'>
          <h2 className='text-lg font-semibold text-neutral-600 dark:text-neutral-200'>
            Update Task
          </h2>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsOpen(false)}
            className='rounded-xl'
          >
            <X className='h-4 w-4' />
          </Button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='text-sm font-medium text-muted-foreground'
              >
                Task name
              </label>
              <div className='mt-1.5 flex gap-x-2 relative'>
                <Checkbox
                  name='checkedDrawer'
                  classNameContainer='self-start'
                  className='h-5 w-5 top-1.5'
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />

                <div className='relative w-full h-full overflow-x-hidden flex justify-between items-center'>
                  <Textarea
                    id='name'
                    reference={textareaRef}
                    value={taskName}
                    onChange={handleChange}
                    onBlur={handleBlurTextarea}
                    className={` focus:!bg-neutral-200 dark:focus:!bg-neutral-900 peer opacity-0 focus:opacity-100`}
                    onClick={handleClickTextarea}
                  />

                  <button
                    className={`absolute pl-1.5 pt-1.5 left-0 z-0 w-full h-8 rounded-md flex items-start text-left pointer-events-none peer-focus:opacity-0`}
                  >
                    <span
                      className={`whitespace-nowrap overflow-hidden 
                        text-ellipsis text-sm w-[calc(100%-1rem)]`}
                    >
                      <Strikethrough checked={checked}>
                        {taskName}
                      </Strikethrough>
                    </span>
                  </button>
                </div>

                <CalendarButton
                  date={date as string}
                  setDate={setDate}
                  disabled={false}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='description'
                className='text-sm font-medium text-muted-foreground'
              >
                Description
              </label>
              <div className='mt-1.5 relative'>
                <textarea
                  id='description'
                  name='description'
                  rows={5}
                  maxLength={1024}
                  value={description}
                  onChange={(e) => setDescription(e.target.value.trimStart())}
                  onBlur={handleBlurDescription}
                  className='w-full pl-3 pr-12 py-1 text-sm rounded-md
                        bg-neutral-200 dark:bg-neutral-900 
                        placeholder:text-muted-foreground
                        focus:outline-none focus:ring-0 focus:ring-transparent
                        resize-none transition-all duration-200
                         border-none focus-visible:ring-0 outline-none text-pretty'
                  placeholder='Add more details to this task...'
                />

                <IAButton
                  isLoading={isGeneratingAI}
                  onClick={handleGenerateAIDescription}
                  disabled={isGeneratingAI}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DrawerModal>
  );
};
