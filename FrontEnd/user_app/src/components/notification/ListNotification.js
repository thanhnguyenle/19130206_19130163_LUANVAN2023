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
