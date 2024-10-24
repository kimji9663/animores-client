import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Dimensions } from "react-native";
import { IconSnsApple, IconSnsFacebook, IconSnsKakao, IconSnsNaver } from '../../assets/icons';
import { commonStyles } from '../../styles/commonStyles';
import FilledInput from '../../components/FilledInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderNavigation from "../../navigation/HeaderNavigation";
import { Colors } from "../../styles/Colors";

const LoginScreen = ({ navigation }: any) => {
  const [diviceHeight, setDiviceHeight] = useState(375)
  const currentHeight = Dimensions.get("window")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setDiviceHeight(currentHeight.height)
    console.log(diviceHeight)
  }, [])

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView>
        <HeaderNavigation middletitle="로그인" hasBackButton={false} />
        <View style={[commonStyles.container, {height: diviceHeight}]}>
          <View style={styles.top}>
            <View style={styles.loginInputWrap}>
              <FilledInput placeholder='이메일' />
              <FilledInput placeholder='비밀번호' secureTextEntry={true} />
            </View>
            <Pressable
              onPress={() => console.log('Pressed')}
              style={styles.loginButton}
              children={<Text style={styles.loginButtonText}>로그인</Text>}
            >
            </Pressable>
          </View>

          <View style={styles.middle}>
            <View style={commonStyles.commonRowContainer}>
              <View style={commonStyles.separator} />
              <View>
                <Text style={{textAlign: 'center', paddingHorizontal:8, color: '#AEAEAE' }}>SNS 간편 로그인</Text>
              </View>
              <View style={commonStyles.separator} />
            </View>
            <View style={commonStyles.commonRowContainer}>
              <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-around', width: '70%'}}>
                <Pressable
                  onPress={() => console.log('apple Pressed')}
                >
                  <Image source={IconSnsApple} alt="icon sns apple" />
                </Pressable>
                <Pressable
                  onPress={() => console.log('facebook Pressed')}
                >
                  <Image source={IconSnsFacebook} alt="icon sns facebook" />
                </Pressable>
                <Pressable
                  onPress={() => console.log('kakao Pressed')}
                >
                  <Image source={IconSnsKakao} alt="icon sns kakao" />
                </Pressable>
                <Pressable
                  onPress={() => console.log('naver Pressed')}
                >
                  <Image source={IconSnsNaver} alt="icon sns naver" />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={commonStyles.commonRowContainer}>
              <Pressable
                onPress={() => console.log('아이디찾기')}
              >
                <Text
                  style={{color: '#AEAEAE'}}
                >아이디찾기</Text>
              </Pressable>
              <View style={commonStyles.verticalBar}></View>
              <Pressable
                onPress={() => console.log('비밀번호 찾기')}
              >
                <Text
                  style={{color: '#AEAEAE'}}
                >비밀번호 찾기</Text>
              </Pressable>
              <View style={commonStyles.verticalBar}></View>
              <Pressable
                onPress={() => navigation.navigate('Join')}
              >
                <Text>회원가입</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  top: {
    //flex: 0.55,
    //backgroundColor: 'yellow',
  },
  loginInputWrap: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  checkboxWrap: {
    flexDirection: 'row',
    marginTop: 15,
  },
  autoLoginLabel: {
    color: '#AEAEAE',
  },
  checkedLabel: {
    color: '#000',
  },
  loginButton: {
    marginTop: 15,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FB3F7E',
  },
  loginButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  middle: {
    //flex: 0.25,
    //backgroundColor: 'beige',
  },
  bottom: {
    //flex: 0.2,
    //backgroundColor: 'pink',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});