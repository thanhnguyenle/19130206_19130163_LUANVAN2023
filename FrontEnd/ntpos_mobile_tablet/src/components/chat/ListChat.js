import React, {useEffect, useState} from 'react';
import SockJsClient from 'react-stomp';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import {get, put} from '../../api';
import Comment from './ChatContent';
import Input from './ChatInput';
import ChatContent from './ChatContent';
import chatAPI from './ChatAPI';

const ListChat = () => {
  const [refreshing] = useState(false);
  const [contents, setContents] = useState([]);
  const [_scrollView, setScrollView] = useState();
  const SOCKET_URL = 'http://localhost:8080/ws-chat/';

  let onConnected = () => {
    console.log('Connected!!');
  };

  let onMessageReceived = msg => {
    console.log('New Message Received!!', msg);
    let current = contents.slice();
    current.push({user_id: 1, content: 'hello'});
    setContents(current);
  };

  let onSendMessage = msgText => {
    chatAPI
      .sendMessage('nhu', msgText)
      .then(res => {
        console.log('Sent', res);
      })
      .catch(err => {
        console.log('Error Occured while sending message to api');
      });
  };

  let handleLoginSubmit = username => {
    console.log(username, ' Logged in..');

    // setUser({
    //   username: username,
    //   color: randomColor(),
    // });
  };

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
    // let current = contents.slice();
    // current.push({user_id: 2, content: 'hello'});
    // setContents(current);
    // _scrollView.scrollTo({y: 0});
    // //
    chatAPI
      .sendMessage('nhu', 'hello')
      .then(res => {
        console.log('Sent', res);
      })
      .catch(err => {
        console.log(err);
        console.log('Error Occured while sending message to api');
      });
  }
  return (
    <View style={styles.container}>
      {/* Scrollable list */}
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/group']}
        onConnect={onConnected}
        onDisconnect={console.log('Disconnected!')}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
        {/* Comment input box */}
        <Input onSubmit={submitComment} />
      </KeyboardAvoidingView>
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
