/* List comprehension helper functions */

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

module.exports = {
  dummy,
  totalLikes
}