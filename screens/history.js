import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RefreshControl} from 'react-native';


const apiurl = "http://192.168.1.43:3000/api/AcceptedRequests";

export default class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      data: [],
      refreshing: true
    };
    this.fetchData = this.fetchData.bind(this);
  }
 
  
  
  componentDidMount() {
    this.fetchData();
    setInterval(this.fetchData, 5000); 
  }

  //----------------------------------------------------------------------------------------------------------------------
  //FETCHING DATA FROM API AND CONVERTING IT TO JSON
  fetchData = async () => {
    const response = await fetch(apiurl);
    const json = await response.json();
    // console.log(json);
    this.setState({ data: json,
    refreshing: false });
  };
 //--------------------------------------------------------------------------------------------------------------------------------
  //REFRESHING DATA
  onRefresh() {
    //Clear old data of the list
    this.setState({ data: [] });
    //Call the Service to get the latest data
    this.fetchData();
  }
  //----------------------------------------------------------------------------------------------------------------------
  //RENDERING FLATLIST ITEMS
  renderItem = (item) => {
   
      return(
       
          <Text style = {styles.item}>
             room number : {` ${item.roomNumber}`} {"\n"}
             
              time accepted :{` ${(item.timeAccepted).toString().substring(11,19)}`}{"\n"}
             date : {` ${(item.timeAccepted).toString().substring(0,10)}`}
            </Text>
          
      );
    
  };
  //----------------------------------------------------------------------------------------------------------------------
  render() {
    return (
      <View style={styles.container}>
        {/* <Header/> */}
        <View style={styles.content}>
        <View style={styles.list}>
        <FlatList 
          style={{width: '100%'}}
          data={this.state.data}
          extraData={this.state.data}
          keyExtractor={(x,i) => i.toString()}
          inverted={true}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              />}
         
          renderItem={({ item }) =>
            this.renderItem(item)
           
          }
          
     
            // inverted
        />
       
        </View>
        
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
   
    backgroundColor: "#F5FCFF"
  },
  
  content:{
    padding: 40,
    
  },
  list:{
   
    marginBottom: 30,
   
    
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  item: {
    padding: 8,
    marginTop: 16,
    borderColor:'#bbb',
    borderWidth:1,
    borderStyle:'dashed',
   
    textAlign:"center",
    flexDirection:'row',
    justifyContent: 'space-between',
    
    
}
  

});

