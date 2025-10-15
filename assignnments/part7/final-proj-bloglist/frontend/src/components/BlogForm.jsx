import { useState } from 'react';

const BlogForm = ({ submitBlog }) => {
  const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
      setValue(event.target.value);
    };

    return {
      type,
      value,
      onChange,
    };
  };

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  return (
    <>
      <form
        onSubmit={(event) =>
          submitBlog(event, {
            title: title.value,
            author: author.value,
            url: url.value,
          })
        }
      >
        <div>
          <label>
            Title
            <input {...title} />
          </label>
        </div>
        <div>
          <label>
            Author
            <input {...author} />
          </label>
        </div>
        <div>
          <label>
            Url
            <input {...url} />
          </label>
        </div>
        <button type='submit'> Add</button>
      </form>
    </>
  );
};

export default BlogForm;
