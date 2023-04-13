import React, {PureComponent, PropTypes} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';

const Comment = props => {
  // Pull data needed to display a comment out of comment object
  const {user_id, content} = props.comment;
  return (
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
        <Text>
          <Text style={[styles.text, styles.name]}>{user_id}:</Text>{' '}
          <Text style={styles.text}>{content}</Text>
        </Text>
        <Text style={[styles.text, styles.created]}>
          {/* {moment(created).fromNow()} */}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderBottomWidth: 1,
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
});
export default Comment;
