import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          width: wp(50),
          backgroundColor: '#2994FF',
          borderRadius: 5,
          paddingVertical: hp(2),
        }}
        onPress={() => navigation.navigate('QuizStack')}>
        <Text style={styles.startText}>Start Quiz!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center', flex: 1},
  startText: {
    fontWeight: 'bold',
    fontSize: wp(5),
    textAlign: 'center',
    color: '#fff',
  },
});

export default Home;
