import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View, Text} from 'react-native';
import {get, put} from '../../api';
import Comment from './Comment';
import Input from './InputComment';
const ListCommand = () => {
  const [refreshing] = useState(false);
  const [comments, setComments] = useState([]);
  const [_scrollView, setScrollView] = useState();
  // static propTypes = {
  //   // User object shape
  //   user: PropTypes.shape({
  //     _id: PropTypes.string.isRequired,
  //   }).isRequired,
  // };

  // state = {
  //   comments: [], // array for comments fetched from the API backend
  //   refreshing: true, // whether comments list is being refreshed or not
  // };

  // Fetch comments when component is about to mount
  // componentWillMount = () => this.fetchComments();

  // Re-fetch comments when user pulls the list down
  // const onRefresh = () => this.fetchComments();

  // Call API to fetch comments
  // const fetchComments = async () => {
  //   this.setState({refreshing: true});
  //   try {
  //     // Make API call
  //     const response = await get('comments');
  //     // Convert response to JSON
  //     const json = await response.json();
  //     this.setState({
  //       refreshing: false,
  //       comments: json.comments,
  //     });
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // Call API to submit a new comment
  // const submitComment = async comment => {
  //   const {user} = this.props;
  //   this._scrollView.scrollTo({y: 0});
  //   try {
  //     // Make API call
  //     const response = await put('comments', {
  //       user_id: user._id,
  //       content: comment,
  //     });
  //     // Convert response to JSON
  //     const json = await response.json();
  //     this.setState({
  //       // Push new comment to state before existing ones
  //       comments: [json.comment, ...this.state.comments],
  //     });
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // Pull comments out of state
  useEffect(() => {
    setComments([
      {
        user_id: 1,
        content: 'hello',
      },
      {
        user_id: 2,
        content: 'hello',
      },
      {
        user_id: 3,
        content: 'hello',
      },
    ]);
  }, []);
  function submitComment() {
    let current = comments.slice();
    current.push({user_id: 4, content: 'hello'});
    setComments(current);
    _scrollView.scrollTo({y: 0});
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titleComment}>COMMENT</Text>
      {/* Scrollable list */}
      <ScrollView
        ref={scrollView => {
          setScrollView(scrollView);
        }}
        // onRefresh={onRefresh}
        // refreshControl={<RefreshControl refreshing={refreshing} />
        // }
      >
        {/* Render each comment with Comment component */}
        {comments.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
      </ScrollView>
      {/* Comment input box */}
      <Input onSubmit={submitComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
  titleComment: {
    fontSize: 20,
  },
  // scrollView: {
  //   flex: 1,
  //   height: 100,
  // },
});
export default ListCommand;
