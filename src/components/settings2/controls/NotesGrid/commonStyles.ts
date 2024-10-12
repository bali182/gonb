import { css } from '@emotion/css'

export const separatorStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(
    calc(100% + 1px) -1px,
    calc(100% - 1px) -1px,
    -1px calc(100% + 1px),
    1px calc(100% + 1px)
  );
  background-color: #00000050;
`
