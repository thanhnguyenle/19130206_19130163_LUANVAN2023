import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { COLORS } from '../../constants/common';

interface ChatContentProps {
  content: {
    user_id: string;
    content: string;
  };
}

const ChatContent: React.FC<ChatContentProps> = (props) => {
  const { user_id, content } = props.content;

  return user_id !== '2' ? (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {/* {avatar && (
          <Image
            resizeMode="contain"
            style={styles.avatar}
            source={{ uri: avatar }}
          />
        )} */}
        <Image
          resizeMode="contain"
          style={styles.avatar}
          source={{
            uri: 'https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg',
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={[styles.text, styles.name]}>{user_id}</Text>
        </View>
        <View style={styles.textBoxRow}>
          <View style={styles.textBox}>
            <Text numberOfLines={20} style={[styles.text, { width: 200 }]}>
              {content}
            </Text>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.right_container}>
      <View style={styles.contentContainer}>
        <View style={styles.right_textName}>
          <Text style={[styles.text, styles.name]}>{user_id}</Text>
        </View>
        <View style={styles.right_textBoxRow}>
          <View style={styles.right_textBox}>
            <Text style={[styles.text]}>{content}</Text>
          </View>
        </View>
      </View>
      <View style={styles.avatarContainer}>
        {/* {avatar && (
          <Image
            resizeMode="contain"
            style={styles.avatar}
            source={{ uri: avatar }}
          />
        )} */}
        <Image
          resizeMode="contain"
          style={styles.avatar}
          source={{
            uri: 'https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  right_container: {
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    padding:1,
    textAlign:'center',
    alignItems:'center'
  },
  avatarContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal:10,
  },
  contentContainer: {
    flex: 1,
    borderColor: '#EEE',
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 13,
    width: 45,
    height: 45,
    padding:10,
  },
  text: {
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: 15,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
  },
  textBox: {
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 5,
  },
  textBoxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  right_textBoxRow: {
    flexDirection: 'row-reverse',
  },
  right_textName: {
    flexDirection: 'row-reverse',
  },
  right_textBox: {
    backgroundColor: COLORS.color_primary,
    padding: 10,
    borderRadius: 5,
  },
});
export default ChatContent;
