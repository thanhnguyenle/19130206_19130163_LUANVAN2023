import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {get, put} from '../../api';
import Comment from './NotificationItem';
import Input from './ChatInput';
import ChatContent from './NotificationItem';
const ListChat = () => {
  const [refreshing] = useState(false);
  const [contents, setContents] = useState([]);
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
    setContents([
      {
        user_id: 1,
        content:
          'hellhello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hellohello helloo hello',
      },
      {
        user_id: 2,
        content: 'hello',
      },
      {
        user_id: 1,
        content: 'hello',
      },
    ]);
  }, []);
  function submitComment() {
    let current = contents.slice();
    current.push({user_id: 2, content: 'hello'});
    setContents(current);
    _scrollView.scrollTo({y: 0});
  }
  return (
    <View style={styles.container}>
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
        {contents.map((content, index) => (
          <ChatContent content={content} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
  // scrollView: {
  //   flex: 1,
  //   height: 100,
  // },
});
export default ListChat;
