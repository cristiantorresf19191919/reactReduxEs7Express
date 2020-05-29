import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post  }) => {            
	useEffect(
		() => {
			getPosts();
		},
		[ getPosts ]
	);

	return (
        <div>

        </div>
    );
};

const mapStateToProps = (state) => ({
	posts: state.post
});

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getPosts })(Posts);
