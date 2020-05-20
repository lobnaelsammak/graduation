import React,{useState} from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import Header from "./components/header";
import TodoItem from "./components/todoItem";

export default function App() {
  const[todos,setTodos] = useState([
    {name: 'lobna', id:'1'},
    {name: 'bo', id:'2'},
    {name: 'tinkiwinki', id:'3'},
    {name: 'dipsy', id:'4'},
    {name: 'lala', id:'5'},
  ]);

    const pressHandler = (key) => {
      setTodos((prevTodos)=>{
        return prevTodos.filter(todos => todos.id != key);
      })
    }
  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.content}>
        {/** TO FORM */}
        <View style={styles.list}>
      <FlatList
        keyExtractor = {(item)=>item.id}
        data ={todos}
        renderItem={({item})=>(
         
            <TodoItem item={item} pressHandler = {pressHandler} />
          
        )}
      />
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  content:{
    padding: 40,


  },
  list:{
    marginTop:20,
  }
});
