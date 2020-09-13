declare module 'async-barrier' {
  function makeAsyncBarrier(count: number): () => Promise<void>;
  export default makeAsyncBarrier;
}
