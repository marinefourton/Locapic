import React, {useState, useEffect} from 'react';
import { StyleSheet, ImageBackground, AsyncStorage } from 'react-native';

import {Button, Input, Text} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';

function HomeScreen({ navigation, onSubmitPseudo }) {

    const [pseudo, setPseudo] = useState('');
  
    useEffect(() => { 
      AsyncStorage.getItem('pseudo', (err, value) => {        
        setPseudo(value);
      })
    }, []);

    
    var inputPseudo;
    if(!pseudo) {
      inputPseudo = <Input
          containerStyle = {{marginBottom: 25, width: '70%'}}
          inputStyle={{marginLeft: 10}}
          placeholder='John'
          leftIcon={
              <Icon
              name='user'
              size={24}
              color="#eb4d4b"
              />
          }
          onChangeText={(val) => setPseudo(val)}
      />
    } else {
      inputPseudo = <Text h4 style={{marginBottom: 25, color: '#FFFFFF'}}>Welcome back {pseudo}</Text>
    }

    return (
    <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>

         {inputPseudo}

        <Button
            icon={
                <Icon
                name="arrow-right"
                size={20}
                color="#eb4d4b"
                />
            }

            title="Go to Map"
            type="solid"
            onPress={() => {
              onSubmitPseudo(pseudo); 
              AsyncStorage.setItem("pseudo", pseudo);
              navigation.navigate('Map');
            }}
        />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


function mapDispatchToProps(dispatch) {
    return {
      onSubmitPseudo: function(pseudo) { 
        dispatch( {type: 'savePseudo', pseudo: pseudo }) 
      }
    }
  }
  
  export default connect(
      null, 
      mapDispatchToProps
  )(HomeScreen);