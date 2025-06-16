import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import Wrapper from '../componets/Wrapper'
import MenuIcon from '../assets/images/menu.png'
import { playSound } from '../helpers/SoundUtility'
import MenuModal from '../componets/modal/MenuModal'
import StartGame from '../assets/images/start.png'
import { useIsFocused } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectDiceTouch, selectPlayer1, selectPlayer2, selectPlayer3, selectPlayer4 } from '../redux/reducers/gameSelector'
import WinModal from '../componets/modal/WinModal'
import { Colors } from '../constants/Colors'
import Dice from '../componets/Dice'
import Pocket from '../componets/Pocket'

const LudoBoardScreen = () => {

  const player1 = useSelector(selectPlayer1);
  const player2 = useSelector(selectPlayer2);
  const player3 = useSelector(selectPlayer3);
  const player4 = useSelector(selectPlayer4);
  const isDiceTouch = useSelector(selectDiceTouch);
  const winner = useSelector(state => state.game.winner);

  const isFocused = useIsFocused();
  const opacity = useRef(new Animated.Value(1)).current;

  const [menuVisible, setMenuVisible] = useState(false)
  const [showStartImage, setShowStartImage] = useState(false)

  const handleMenuPress = useCallback(() => {
    playSound('ui');
    setMenuVisible(true)
  }, [])

  useEffect(() => {
    if (isFocused) {
      setShowStartImage(true);
      const blinkAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      );

      blinkAnimation.start();

      const timeOut = setTimeout(() => {
        blinkAnimation.stop();
        setShowStartImage(false)
      }, 2500);

      return () => {
        blinkAnimation.stop();
        clearTimeout(timeOut);
      }
    }
  }, [isFocused])

  return (
    <Wrapper>
      <TouchableOpacity style={styles.menuIcon} onPress={handleMenuPress}>
        <Image source={MenuIcon} style={styles.menuIconImg} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View
          style={styles.flexRow}
          pointerEvents={isDiceTouch ? 'none' : 'auto'}
        >
          <Dice color={Colors.green} player={2} data={player2} />
          <Dice color={Colors.yellow} player={3} rotate data={player3} />
        </View>

        <View style={styles.ludoBoard}>

          <View style={styles.plotContainer}>
            <Pocket color={Colors.green} player={2} data={player2} />
            <Pocket color={Colors.yellow} player={3} data={player3} />
          </View>

          <View style={styles.pathContainer}>

          </View>

          <View style={styles.plotContainer}>
            <Pocket color={Colors.red} player={1} data={player1} />
            <Pocket color={Colors.blue} player={4} data={player4} />
          </View>
        </View>

        <View
          style={styles.flexRow}
          pointerEvents={isDiceTouch ? 'none' : 'auto'}
        >
          <Dice color={Colors.red} player={1} data={player1} />
          <Dice color={Colors.blue} player={4} rotate data={player4} />
        </View>

      </View>

      {showStartImage && (
        <Animated.Image
          source={StartGame}
          style={{
            width: deviceWidth * 0.5,
            height: deviceHeight * 0.2,
            position: 'absolute',
            opacity
          }}
        />
      )}

      {winner != null && <WinModal winner={winner} />}

      {menuVisible && (
        <MenuModal
          onPressHide={() => setMenuVisible(false)}
          visible={menuVisible}
        />
      )}
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight * 0.5,
    width: deviceWidth,
  },
  ludoBoard: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    padding: 10
  },
  menuIcon: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  menuIconImg: {
    width: 30,
    height: 30,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    width: '100%'
  },
  plotContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ccc'
  },
  pathContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    justifyContent: 'space-between',
    backgroundColor: '#1E5162',
  }
})


export default LudoBoardScreen