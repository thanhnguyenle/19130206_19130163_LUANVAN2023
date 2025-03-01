import React, { useEffect, useState } from 'react';
import SockJsClient from 'react-stomp';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import chatAPI from "./ChatAPI";
import ChatInput from "./ChatInput";
import ChatContent from "./ChatContent";

const DetailChatScreen: React.FC = () => {
  const [refreshing] = useState(false);
  const [contents, setContents] = useState<{ user_id: string; content: string }[]>([]);
  const [_scrollView, setScrollView] = useState<ScrollView | null>(null);
  const SOCKET_URL = 'https://5f96-203-113-146-152.ngrok-free.app/chat-service/ws-chat/';

  let onConnected = () => {
    console.log('Connected!!');
  };

  let onMessageReceived = (msg: any) => {
    console.log('New Message Received!!', msg);
    let current = contents.slice();
    current.push({ user_id: '1', content: 'hello' });
    setContents(current);
  };

  let onSendMessage = (msgText: string) => {
    chatAPI
      .sendMessage('nhu', msgText)
      .then((res) => {
        console.log('Sent', res);
      })
      .catch((err) => {
        console.log('Error Occurred while sending message to api');
      });
  };

  let handleLoginSubmit = (username: string) => {
    console.log(username, ' Logged in..');
  };

  useEffect(() => {
    setContents([
      {
        user_id: '1',
        content:
          'hello',
      },
      {
        user_id: '2',
        content: 'hello',
      },
      {
        user_id: '1',
        content: 'hello',
      },
    ]);
  }, []);

  function submitComment() {
    chatAPI
      .sendMessage('nhu', 'hello')
      .then((res) => {
        console.log('Sent', res);
      })
      .catch((err) => {
        console.log(err);
        console.log('Error Occurred while sending message to api');
      });
  }

  return (
    <View style={styles.container}>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/group']}
        onConnect={onConnected}
        onDisconnect={() => console.log('Disconnected!')}
        onMessage={(msg: any) => onMessageReceived(msg)}
        debug={false}
      />
      <ScrollView style={{flex:2}}
                  ref={(scrollView) => {
                    setScrollView(scrollView);
                  }}
      >
        {contents.map((content, index) => (
          <ChatContent key={index} content={content} />
        ))}
      </ScrollView>
      <ChatInput onSubmit={submitComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
});

export default DetailChatScreen;
