import { TaskProps } from "../interfaces/task.interface";

// funcion donde le pase dos arrays de objectos y me devuelva los objetos
// que no se repiten y los que se repiten que me conserve los que estan en el primer array
export const uniqueObjectsArray = (
  array1: TaskProps[],
  array2: TaskProps[]
) => {
  const array3 = array1.filter(
    (item) => !array2.some((item2) => item.id === item2.id)
  );
  return [...array2, ...array3];
};
