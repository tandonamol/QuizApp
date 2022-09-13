import React from 'react';
import {View, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Question = ({data}) => {
  return (
    <View>
      <Text style={{fontWeight: 'bold', fontSize: wp(6)}}>{data}</Text>
    </View>
  );
};

export default Question;
