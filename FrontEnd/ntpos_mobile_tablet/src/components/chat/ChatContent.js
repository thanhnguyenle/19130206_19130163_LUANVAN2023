import React, {PureComponent, PropTypes} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {COLORS} from '../../constants/common';

const ChatContent = props => {
  // Pull data needed to display a comment out of comment object
  const {user_id, content} = props.content;
  return user_id != '2' ? (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {/* {avatar && (
          <Image
            resizeMode="contain"
            style={styles.avatar}
            source={{uri: avatar}}
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
            <Text numberOfLines={20} style={[styles.text, {width: 200}]}>
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
            source={{uri: avatar}}
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
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
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
    width: 26,
    height: 26,
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
    padding: 5,
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
    backgroundColor: '#3CB371',
    padding: 5,
    borderRadius: 5,
  },
});
export default ChatContent;
