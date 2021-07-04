import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme} from './theme';
import { Dimensions, StatusBar } from 'react-native';
import Input from './components/Input';
import { images } from './images';
import Task from './components/Task';
import AsyncStorage from '@react-native-community/async-storage';


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
  const [tasks, setTasks] = useState({});

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask('');
    _saveTasks({ ...tasks, ...newTaskObject });
  };

  const _deleteTask = id => {
    const currentTasks = Object.assign({},tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
  };

  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    _saveTasks(currentTasks);
  };

  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    _saveTasks(currentTasks);
  };

  const _onBlur = () => {
    setNewTask('');
  };

  const _saveTasks = async tasks => {
      try{
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        setTasks(tasks);
      }catch(e){
        console.error(e);
      }
  };

  // expo app loading 을 사용하지 않는 방법으로 진행 
  const _loadTasks = async() =>{
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks || '{}'));
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
          onBlur={_onBlur}
          />
        <List width={width}>
          {Object.values(tasks).reverse().map(item => (<Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} />))}
        </List>

      </Container>
    </ThemeProvider>
  );
};

export default App;
