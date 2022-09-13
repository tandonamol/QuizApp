import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Quiz from './quiz';
import Home from './Home';

const QuizStack = createNativeStackNavigator();

function QuizStackScreen() {
  return (
    <QuizStack.Navigator>
      <QuizStack.Screen
        name="Quiz"
        component={Quiz}
        options={{headerShown: false}}
      />
    </QuizStack.Navigator>
  );
}

const Nav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuizStack"
        component={QuizStackScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Nav;
