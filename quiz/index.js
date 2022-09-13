import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Question from './components/question';
import Header from './templates/header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Quiz = () => {
  const [userAnswer, setUserAnswer] = useState(null);
  const [data, setData] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  const getQA = () => {
    axios
      .get('https://opentdb.com/api.php?amount=1')
      .then(function (response) {
        setData(response?.data?.results[0]);
        console.log(response?.data?.results?.[0]);
        setCorrectAnswer(response?.data?.results?.[0]?.correct_answer);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getQA();
  }, [questionCount]);

  const handleSubmit = () => {
    setUserAnswer('');
    setQuestionCount(questionCount + 1);
    if (userAnswer.toLowerCase() == correctAnswer.toLowerCase()) {
      {
        setCorrectAnswerCount(correctAnswerCount + 1);
        Alert.alert('Correct Answer!');
      }
    } else Alert.alert('Wrong Answer');
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.optionView}>
        <Text style={styles.optionText}>{index + 1 + '.'}</Text>
        <Text style={{fontWeight: 'bold', fontSize: wp(5), marginLeft: wp(5)}}>
          {item}
        </Text>
      </View>
    );
  };

  return (
    <>
      <Header q_No={questionCount} />
      <SafeAreaView style={styles.container}>
        <Question data={data?.question} />
        {/* {data?.type == 'multiple' && (
      <FlatList
        data={data && data?.incorrect_answers}
        renderItem={renderItem}
      />
    )} */}
        <TextInput
          style={styles.textInput}
          onChangeText={setUserAnswer}
          placeholder="Type your answer here..."
          value={userAnswer}
        />
        <TouchableOpacity
          onPress={() => {
            if (userAnswer?.length == 0 || userAnswer == null)
              Alert.alert('Please enter your answer');
            else handleSubmit();
          }}
          style={styles.button}>
          <Text
            style={{
              // fontFamily: 'Cochin',
              fontWeight: 'bold',
              color: '#fff',
              fontSize: wp(4.5),
            }}>
            Submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Your score is ' + correctAnswerCount + '/' + questionCount,
            )
          }
          style={styles.button}>
          <Text
            style={{
              // fontFamily: 'Cochin',
              fontWeight: 'bold',
              color: '#fff',
              fontSize: wp(4.5),
            }}>
            My Score
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp(4),
    marginTop: hp(10),
  },
  textInput: {
    height: hp(5),
    borderWidth: 1,
    padding: 10,
    width: wp(95),
    borderColor: '#707070',
    alignSelf: 'center',
    marginTop: hp(3),
  },
  button: {
    width: wp(50),
    height: hp(5),
    backgroundColor: '#2994FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: hp(2),
    alignSelf: 'center',
  },
  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    justifyContent: 'flex-start',
    marginTop: hp(1),
    height: hp(5),
  },
  optionText: {
    fontWeight: 'bold',
    fontSize: wp(4),
    textAlign: 'center',
  },
});

export default Quiz;
