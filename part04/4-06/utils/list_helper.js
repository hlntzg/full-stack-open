const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

// returns an object with the title, author, and likes fields
const mostLiked = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const favorite = blogs.reduce((max, blog) =>
    blog.likes > max.likes ? blog : max
  )

  return {
    title: favorite.title,
    author: favorite.author,
    url: favorite.url,
    likes: favorite.likes,
  }
}
// const mostLiked = (blogs) => {
//   const favorite = _.maxBy(blogs, 'likes')
//   return favorite
//     ? { title: favorite.title, author: favorite.author, likes: favorite.likes }
//     : {}
// }


// returns the author who has the largest amount of blogs and
// the total number of blogs that the top author has
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const counts = _.countBy(blogs, 'author')
  const pairs = _.toPairs(counts)
  const topAuthor = _.maxBy(pairs, ([, count]) => count)

  return {
    author: topAuthor[0],
    blogs: topAuthor[1],
  }
}

module.exports = {
    dummy,
    totalLikes,
    mostLiked,
    mostBlogs,
}