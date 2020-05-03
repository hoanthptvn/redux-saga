import * as taskAPIs from '../apis/task';

export const fetchListTask = () => {
  return (dispach) => {
    taskAPIs
      .getList()
      .then((data) => {
        console.log('data', data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
