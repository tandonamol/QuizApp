import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Header = ({q_No}) => {
  return (
    <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontWeight: 'bold', fontSize: wp(6)}}>
        Question-{q_No + 1}
      </Text>
    </SafeAreaView>
  );
};

export default Header;
