import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, fontSizes } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export function Countdown({ minutes = 1, isPaused, onProgress, onEnd }) {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const minutesRemaining = Math.floor(millis / 1000 / 60) % 60;
  const secondsRemaining = Math.floor(millis / 1000) % 60;

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMillis(minutes));
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
    /* eslint-disable-next-line */
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {formatTime(minutesRemaining)}:{formatTime(secondsRemaining)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    padding: spacing.lg,
    color: colors.white,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
