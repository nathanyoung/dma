import React from "react";
import PropTypes from "prop-types";
import {
  Block,
  ButtonGroup,
  Heading,
  TextContainer
} from "@istreamplanet/pebble";

const propTypes = {
  breadcrumbs: PropTypes.node,
  children: PropTypes.node,
  subtitle: PropTypes.node,
  title: PropTypes.node.isRequired
};

// ------
// This component was made to show UX/UI design intent and not for production.
// ------

function Header({ breadcrumbs, children, subtitle, title }) {
  const headingElement =
    typeof title === "string" ? <Heading element="1">{title}</Heading> : title;

  const subtitleMarkup =
    typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle;

  return (
    <Block justify="between" alignItems="center" marginBottom="5">
      <TextContainer tight>
        {breadcrumbs}
        {headingElement}
        {subtitleMarkup}
      </TextContainer>
      {children && <ButtonGroup>{children}</ButtonGroup>}
    </Block>
  );
}

Header.propTypes = propTypes;
Header.displayName = "Header";

export default Header;
