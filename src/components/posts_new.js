import React, { Component } from 'react';
import { connect } from 'react-redux';

// reduxForm object nearly identical to 
// 'connect' function in redux library; 
// will use reduxForm to wrap PostsNew component
import { reduxForm, Field } from 'redux-form';

// action creator
import { createPost } from '../actions/index';

// React Components
import PostsFormTitle from './posts_form_title';
import PostsFormCategories from './posts_form_categories';
import PostsFormContent from './posts_form_content';

// On form submit, action creator createPost called
const doSubmit = data => createPost(data);

// Stateless functional component that users see when 
// they navigate to the URL '/posts/new'
let PostsNew = props => (

	// handleSubmit is a helper function provided by ReduxForm
	<form onSubmit = { props.handleSubmit(doSubmit) }>
		<div className = "blog-post-header">
			<h3>Create a New Blog Post</h3>
		</div>
		<div>
			<Field
				name= "title"
				component= { PostsFormTitle }
				props= {{ className: 'form-control' }}
				type= "text"
				placeholder= "Make it groovy">Title
			</Field>
		</div>
		<div>
			<Field
				name= "categories"
				component= { PostsFormCategories }
				props= {{ className: 'form-control' }}
				type= "text"
				placeholder= "Organize for later">Categories
			</Field>
		</div>
		<div>
			<Field
				name= "content"
				component= { PostsFormContent }
				props= {{ className: 'form-control' }}
				type= "textarea"
				placeholder= "Your thoughts matter">Content
			</Field>
		</div>
		<div className="col-sm-2">
			<input
				type="submit"
				className="btn btn-primary"
			/>
		</div>
		
	</form>
)

// PostsNew component wrapped by redux-form
PostsNew = reduxForm({ form: 'PostsNewForm' })(PostsNew);

export default PostsNew;

// connect()
// first argument: mapStateToProps
// second argument: mapDispatchToProps

// form name => needs to be unique
// fields => reduxForm will watch for the inputs

// reduxForm injects helper function into this.props, inside the component
/*
	export default connect(null, {createPost})(reduxForm({
	form: 'PostsNewForm'})
	(PostsNew));
*/


// BEHIND THE SCENES:
// whenever user makes changes to a field,
// redux-form records those changes on the global application state:
/* 
		state === {
			// form is the reducer
			form: {
				PostsNewForm: {
					title: '...',
					categories: '...',
					content: '...'
				}
			}
		}

	instead of recording these properties on a component level, 
	redux-form is putting these properties directly onto the 
	application state.
*/

/*
	// Define stateless component to render input and errors

	// Defined outside of render() method, otherwise it will be 
	// recreated on every re-render, leading to slower performance.
	const renderField = (field) => (
	    <div className="input-row">
	      <input {...field.input} type="text"/>
	      {field.meta.touched && field.meta.error && 
	       <span className="error">{field.meta.error}</span>}
	    </div>
  	)
*/

