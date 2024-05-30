import styled from "styled-components";
import { theme } from "../../styles/theme";
import { device } from "../../styles/device";

const H1 = styled.h1`
  text-align: ${({ txtalign }) => txtalign};
  color: ${({ txtcolor }) =>
    txtcolor ? txtcolor : theme.colors.secondaryDarkGray};
  font-style: ${({ fstyle }) => (fstyle ? fstyle : "normal")};
  font-weight: ${({ fweight }) => (fweight ? fweight : "500")};
  font-size: ${({ fsize }) => (fsize ? fsize : "20px")};
  line-height: ${({ lheight }) => (lheight ? lheight : "24px")};
  margin-top: ${({ mt }) => (mt ? mt : "0px")};
  margin-bottom: ${({ mb }) => (mb ? mb : "0px")};
  display: inline-block;
  vertical-align: middle;
  padding-top: ${({ pt }) => (pt ? pt : "0px")};
  padding-bottom: ${({ pb }) => (pb ? pb : "0px")};

  @media ${device.tablet} {
    font-size: 20px;
    line-height: 26px;
  }
  @media ${device.tablet} {
    font-size: 18px;
    line-height: 22px;
  }
  @media ${device.mobile} {
    font-size: 18px;
    line-height: 20px;
    margin-bottom: 15px;
  }
  @media ${device.mobile} {
    font-size: 16px;
    line-height: 16px;
  }
`;
const H2 = styled.h2`
  text-align: ${({ txtalign }) => txtalign};
  color: ${({ txtcolor }) => txtcolor};
  font-style: ${({ fstyle }) => (fstyle ? fstyle : "normal")};
  font-weight: ${({ fweight }) => (fweight ? fweight : "700")};
  font-size: ${({ fsize }) => (fsize ? fsize : "22px")};
  line-height: ${({ lheight }) => (lheight ? lheight : "27px")};
  margin-top: ${({ mt }) => (mt ? mt : "0px")};
  margin-bottom: ${({ mb }) => (mb ? mb : "26px")};
  padding-top: ${({ pt }) => (pt ? pt : "0px")};
  padding-bottom: ${({ pb }) => (pb ? pb : "0px")};
`;
const H3 = styled.h3`
  text-align: ${({ txtalign }) => txtalign};
  color: ${({ txtcolor }) => txtcolor};
  font-style: ${({ fstyle }) => (fstyle ? fstyle : "")};
  font-weight: ${({ fweight }) => (fweight ? fweight : "")};
  font-size: ${({ fsize }) => (fsize ? fsize : "")};
  line-height: ${({ lheight }) => (lheight ? lheight : "")};
  margin-top: ${({ mt }) => (mt ? mt : "0px")};
  margin-bottom: ${({ mb }) => (mb ? mb : "0px")};
  padding-top: ${({ pt }) => (pt ? pt : "0px")};
  padding-bottom: ${({ pb }) => (pb ? pb : "0px")};
  @media ${device.tablet} {
    font-size: 18px;
    line-height: 20px;
  }
  @media ${device.tablet} {
    font-size: 16px;
    line-height: 16px;
  }
  @media ${device.mobile} {
    font-size: 16px;
    line-height: 18px;
  }
`;
const H4 = styled.h4`
  text-align: ${({ txtalign }) => txtalign};
  color: ${({ txtcolor }) => txtcolor};
  font-style: ${({ fstyle }) => (fstyle ? fstyle : "")};
  font-weight: ${({ fweight }) => (fweight ? fweight : "")};
  font-size: ${({ fsize }) => (fsize ? fsize : "")};
  line-height: ${({ lheight }) => (lheight ? lheight : "")};
  margin-top: ${({ mt }) => (mt ? mt : "0px")};
  margin-bottom: ${({ mb }) => (mb ? mb : "0px")};
  padding-top: ${({ pt }) => (pt ? pt : "0px")};
  padding-bottom: ${({ pb }) => (pb ? pb : "0px")};

  @media ${device.tablet} {
    font-size: 18px;
    line-height: 20px;
  }
  @media ${device.tablet} {
    font-size: 16px;
    line-height: 16px;
  }
  @media ${device.mobile} {
    font-size: 16px;
    line-height: 18px;
  }
`;
const H5 = styled.h5`
  text-align: ${({ txtalign }) => txtalign};
  color: ${({ txtcolor }) => txtcolor};
  font-style: ${({ fstyle }) => (fstyle ? fstyle : "")};
  font-weight: ${({ fweight }) => (fweight ? fweight : "")};
  font-size: ${({ fsize }) => (fsize ? fsize : "")};
  line-height: ${({ lheight }) => (lheight ? lheight : "")};
  margin-top: ${({ mt }) => (mt ? mt : "0px")};
  margin-bottom: ${({ mb }) => (mb ? mb : "0px")};
  padding-top: ${({ pt }) => (pt ? pt : "0px")};
  padding-bottom: ${({ pb }) => (pb ? pb : "0px")};

  @media ${device.tablet} {
    font-size: 16px;
    line-height: 20px;
  }
  @media ${device.tablet} {
    font-size: 16px;
    line-height: 18px;
  }
  @media ${device.mobile} {
    font-size: 16px;
    line-height: 20px;
  }
`;
const H6 = styled.h6`
  text-align: ${({ txtalign }) => txtalign};
  color: ${({ txtcolor }) => txtcolor};
  font-style: ${({ fstyle }) => (fstyle ? fstyle : "")};
  font-weight: ${({ fweight }) => (fweight ? fweight : "")};
  font-size: ${({ fsize }) => (fsize ? fsize : "")};
  line-height: ${({ lheight }) => (lheight ? lheight : "")};
  margin-top: ${({ mt }) => (mt ? mt : "0px")};
  margin-bottom: ${({ mb }) => (mb ? mb : "0px")};
  padding-top: ${({ pt }) => (pt ? pt : "0px")};
  padding-bottom: ${({ pb }) => (pb ? pb : "0px")};
`;
const ParagraphText = styled.p`
  color: ${({ txtcolor }) => (txtcolor ? txtcolor : theme.colors.mainBlack)};
  font-size: ${({ psize }) => (psize ? psize : "12px")};
  line-height: ${({ plheight }) => (plheight ? plheight : "15px")};
  text-align: ${({ palign }) => (palign ? palign : "center")};
  margin-top: ${({ pmt }) => (pmt ? pmt : "")};
  margin-bottom: ${({ pmb }) => (pmb ? pmb : "")};
  font-style: ${({ pstyle }) => (pstyle ? pstyle : "normal")};
  font-weight: ${({ pweight }) => (pweight ? pweight : "")};
  padding-left: ${({ pleft }) => pleft};
  padding-right: ${({ pright }) => pright};
`;

export { H1, H2, H3, H4, H5, H6, ParagraphText };
