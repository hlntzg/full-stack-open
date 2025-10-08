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

// return an object with the title, author, and likes fields
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

module.exports = {
    dummy,
    totalLikes,
    mostLiked
}