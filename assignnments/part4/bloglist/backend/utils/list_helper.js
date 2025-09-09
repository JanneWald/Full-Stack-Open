/* List comprehension helper functions */
const _ = require('lodash')


// Returns 1 from any blog
const dummy = (blogs) => {
  return 1
}

// Sums all the likes in a list of blogs
const totalLikes = (blogs) => {
    sum = 0

    blogs.map(blog => {
      sum += blog.likes
    })

    return sum
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0

  blogs.forEach(blog => {
    if(blog.likes >= mostLikes){
      mostLikes = blog.likes
    }
  });

  return blogs.find(blog => blog.likes === mostLikes)
}

const mostBlogs = (blogs) => {
  authorBlogCounts = _.countBy(blogs, 'author')

  const [authorWithMostBlogs, maxBlogs] = _.maxBy(_.entries(authorBlogCounts), ([author, count]) => count);
  
  return {author:authorWithMostBlogs, blogs:maxBlogs}
}

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')

  const authorLikes = _.map(grouped, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes')
  }))

  const topAuthor = _.maxBy(authorLikes, 'likes')

  return { author:topAuthor.author, likes:topAuthor.likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}