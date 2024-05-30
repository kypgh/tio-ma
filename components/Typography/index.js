import { H1, H2, H3, H4, H5, H6, ParagraphText } from "./typography.styles";

const TitleH1 = ({ children, ...rest }) => {
  return <H1 {...rest}>{children}</H1>;
};
const TitleH2 = ({ children, ...rest }) => {
  return <H2 {...rest}>{children}</H2>;
};
const TitleH3 = ({ children, ...rest }) => {
  return <H3 {...rest}>{children}</H3>;
};
const TitleH4 = ({ children, ...rest }) => {
  return <H4 {...rest}>{children}</H4>;
};
const TitleH5 = ({ children, ...rest }) => {
  return <H5 {...rest}>{children}</H5>;
};
const TitleH6 = ({ children, ...rest }) => {
  return <H6 {...rest}>{children}</H6>;
};
const ParaText = ({ children, ...rest }) => {
  return <ParagraphText {...rest}>{children}</ParagraphText>;
};

export { TitleH1, TitleH2, TitleH3, TitleH4, TitleH5, TitleH6, ParaText };
