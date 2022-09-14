import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
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
  const [questionCount, setQuestionCount] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [displayResponse, setDisplayResponse] = useState(null);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [submitActive, setSubmitActive] = useState(true);

  const getQA = () => {
    axios
      .get('https://opentdb.com/api.php?amount=1')
      .then(function (response) {
        setData(response?.data?.results[0]);
        setCorrectAnswer(response?.data?.results?.[0]?.correct_answer);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getQA();
  }, [nextQuestion]);

  const handleSubmit = () => {
    setSubmitActive(false);
    setQuestionCount(questionCount + 1);
    if (userAnswer.toLowerCase() == correctAnswer.toLowerCase()) {
      {
        setCorrectAnswerCount(correctAnswerCount + 1);
        setDisplayResponse('Correct Answer');
      }
    } else setDisplayResponse('Wrong Answer');
  };

  const handleNext = () => {
    setNextQuestion(!nextQuestion);
    setUserAnswer('');
    setSubmitActive(true);
    setDisplayResponse(null);
  };

  return (
    <>
      <View style={styles.header}>
        <Header q_No={questionCount} />
        <Text style={{fontWeight: 'bold', fontSize: wp(6)}}>
          Score:{correctAnswerCount}/{questionCount}
        </Text>
      </View>

      <SafeAreaView style={styles.container}>
        <Question data={data?.question} />

        <TextInput
          style={styles.textInput}
          onChangeText={setUserAnswer}
          placeholder="Type your answer here..."
          value={userAnswer}
        />
        {displayResponse == 'Correct Answer' ? (
          <Text style={[styles.responseLabel, {color: 'green'}]}>
            {displayResponse}
          </Text>
        ) : displayResponse == 'Wrong Answer' ? (
          <Text style={[styles.responseLabel, {color: 'red'}]}>
            {displayResponse}
          </Text>
        ) : null}
        <TouchableOpacity
          disabled={!submitActive}
          onPress={() => {
            if (userAnswer?.length == 0 || userAnswer == null)
              Alert.alert('Please enter your answer');
            else handleSubmit();
          }}
          style={[
            styles.button,
            {backgroundColor: submitActive ? '#2994FF' : 'grey'},
          ]}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNext()}
          style={[styles.button, {backgroundColor: 'maroon'}]}>
          <Text style={styles.buttonText}>Next</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginHorizontal: wp(2),
  },
  textInput: {
    height: hp(5),
    borderWidth: 1,
    padding: 10,
    width: wp(95),
    borderColor: '#707070',
    alignSelf: 'center',
    marginTop: hp(3),
    borderRadius: 5,
  },
  button: {
    width: wp(95),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: hp(2),
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: wp(4.5),
  },
  responseLabel: {
    fontWeight: 'bold',
    fontSize: wp(5),
    marginTop: hp(1),
  },
});

export default Quiz;
