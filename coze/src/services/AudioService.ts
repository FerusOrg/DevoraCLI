import { Audio } from 'expo-av';

export interface SoundLayer {
  id: string;
  uri: string;
  volume: number;
  soundObj: Audio.Sound | null;
}

class AudioEngine {
  private layers: Map<string, SoundLayer> = new Map();
  private isInitialized = false;

  async init() {
    if (this.isInitialized) return;
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      this.isInitialized = true;
    } catch (e) {
      console.warn("Audio init failed:", e);
    }
  }

  async loadLayer(id: string, uri: string, volume: number = 0.5) {
    if (!this.isInitialized) await this.init();
    if (this.layers.has(id)) return;

    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { isLooping: true, volume, shouldPlay: true }
      );
      this.layers.set(id, { id, uri, volume, soundObj: sound });
    } catch (error) {
      console.error(`Failed to load sound ${id}:`, error);
    }
  }

  async setVolume(id: string, volume: number) {
    const layer = this.layers.get(id);
    if (layer && layer.soundObj) {
      layer.volume = volume;
      try {
        await layer.soundObj.setVolumeAsync(volume);
      } catch (e) {
         console.warn(`Volume update failed for ${id}:`, e);
      }
    }
  }

  async playAll() {
    const promises = [];
    for (const [_, layer] of this.layers) {
      if (layer.soundObj) promises.push(layer.soundObj.playAsync());
    }
    await Promise.all(promises);
  }

  async pauseAll() {
    const promises = [];
    for (const [_, layer] of this.layers) {
      if (layer.soundObj) promises.push(layer.soundObj.pauseAsync());
    }
    await Promise.all(promises);
  }

  async unloadAll() {
    const promises = [];
    for (const [_, layer] of this.layers) {
      if (layer.soundObj) promises.push(layer.soundObj.unloadAsync());
    }
    await Promise.all(promises);
    this.layers.clear();
  }
}

export const audioService = new AudioEngine();
