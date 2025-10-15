import { useField } from '../hooks/index';

const BlogForm = ({ submitBlog }) => {
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
