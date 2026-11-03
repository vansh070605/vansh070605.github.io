// Tiny shared state between the page UI and the 3D cloud.
// A plain mutable object: the cloud reads it every frame, so no re-renders are needed.
export const swarm = {
  project: null,  // name of the hovered or open project; drives the Work-section shape
  burstAt: 0,     // timestamp of the last hero click
  xp: 0,          // 0..1 scroll progress through Experience; turns the helix and moves its band
  tint: null,     // colour of the current Experience entry
  loaded: false,  // the cloud has sampled its portrait (the preloader waits for this)
  revealed: false, // preloader has gone; until then the cloud stays scattered
};
