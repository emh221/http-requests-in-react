import React, { Component } from 'react';
import axios from '../../axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    error: false,
    posts: [],
    selectedPostID : null
  }

  componentDidMount (){
    axios.get('/posts')
    .then(response => {
      const posts = response.data.slice(0 ,4);
      const updatedPosts = posts.map(post => {
        return {
          ...post,
          author: 'Max'
        }
      })
      this.setState({posts: updatedPosts});
    }).catch(
      err=> {
      this.setState({error: true})
    });
  }

  postSelectedHandler =(id) => {
    this.setState({selectedPostID: id})
  }

  render () {
    let posts = <p style={{Align: 'center'}}> Something went wrong!</p>
    if (!this.state.error){
      posts = this.state.posts.map(post => {
      return <Post
              key = {post.id}
              title = {post.title}
              author={post.author}
              clicked = {() => this.postSelectedHandler(post.id)}/>
    }
  )}
    return (
      <div>
      <section className="Posts">
      <Post />
      <Post />
      <Post />
      </section>
      <section>
      <FullPost id = {this.state.selectedPostID}/>
      </section>
      <section>
      {posts}
      <NewPost />
      </section>
      </div>
    );
  }
}

export default Blog;
