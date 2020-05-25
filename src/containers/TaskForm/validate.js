const validate = (values) => {
  const error = {};
  const { title } = values;
  if (!title) {
    error.title = 'Vui lòng nhập tiêu đề';
  } else if (title.trim().length < 5) {
    error.title = 'Tiêu đề phải từ 5 ký tự';
  }
  return error;
};

export default validate;
