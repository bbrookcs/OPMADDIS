declare module '@lottiefiles/svelte-lottie-player' {
  import { SvelteComponentTyped } from 'svelte';

  export class LottiePlayer extends SvelteComponentTyped<{
    src: string;
    autoplay?: boolean;
    loop?: boolean;
    controls?: boolean;
    background?: string;
    hover?: boolean;
    style?: string;
  }> {}
}

declare module '@lottiefiles/dotlottie-svelte' {
  import { SvelteComponentTyped } from 'svelte';

  export class DotLottieSvelte extends SvelteComponentTyped<{
    src?: string;
    autoplay?: boolean;
    loop?: boolean;
    controls?: boolean;
    background?: string;
    speed?: number;
    mode?: string;
    style?: string;
  }> {}
} 