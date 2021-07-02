import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme} from './theme';
import { Dimensions, StatusBar } from 'react-native';
import Input from './components/Input';
import { images } from './images';
import Task from './components/Task';


const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({theme})=>theme.main};
  align-self: flex-start;
  margin: 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({width}) => width - 40}px;
`;

const App = () => {

  const width = Dimensions.get('window').width;
  const [newTask, setNewTask] = useState('');

  const _addTask = () => {
    alert(`Add: ${newTask}`);
    setNewTask('');
  };

  const _handleTextChange = text => {
    setNewTask(text);
  };

  return(
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar 
        barStyle="light-content"
        backgroundColor={theme.background}
        />
        <Title>TODO List</Title>
        <Input 
          placeholder="+ Add a Task"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
          />
        <List width={width}>
          <Task text="Hanbit"/>
          <Task text="React Native"/>
          <Task text="React Native Sample"/>
          <Task text="Edit TODO Item"/>
        </List>

      </Container>
    </ThemeProvider>
  );
};

export default App;
