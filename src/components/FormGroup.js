import {
  Block,
  Heading,
  List,
  ListItem,
  Text,
  TextContainer
} from "@istreamplanet/pebble";

import PropTypes from "prop-types";
import React from "react";

const propTypes = {
  /**
   * Boolean flag that will apply value of 'bottom' to the base Block component's border prop when true
   * Block component ref: https://pebble.istreamplanet.net/#/Components/Block
   */
  bottomBorder: PropTypes.bool,
  /**
   * Text for the description section
   */
  description: PropTypes.string,
  /**
   * Elements to be rendered as children of this component
   */
  children: PropTypes.node,
  /**
   * Flex direction of Block element that wraps the component's children
   * Block component ref: https://pebble.istreamplanet.net/#/Components/Block
   */
  childDirection: PropTypes.oneOf(["column", "row"]),
  /**
   * Amount of space between child element
   */
  itemSpacing: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  /**
   * Text or markup that will be displayed as the header/title
   */
  title: PropTypes.oneOfType(PropTypes.string, PropTypes.object),
  /**
   * Form validation errors to display to the user, will list errors when array, display single as string
   */
  validationErrors: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};

const defaultProps = {
  bottomBorder: true,
  childDirection: "column",
  itemSpacing: [3, 4, 5]
};

/**
 * @description Function that returns relevant markup displaying validation errors if they exist
 *
 * @param {string|Array} validationErrors - The validation errors prop as an array if multiple and string if single
 * @returns {object|null} - The relevant markup displaying validation errors if they exist, null otherwise
 */
export function generateValidationMarkup(validationErrors) {
  if (typeof validationErrors === "string") {
    return (
      <Text appearance="danger" className="field-text-validation pt-2" size="6">
        {validationErrors}
      </Text>
    );
  }

  if (Array.isArray(validationErrors) && validationErrors.length > 0) {
    return (
      <List>
        {validationErrors.map((el, i) => (
          <ListItem key={i}>
            <Text appearance="danger" className="field-text-validation pt-2">
              {el}
            </Text>
          </ListItem>
        ))}
      </List>
    );
  }

  return null;
}

/**
 * @description Layout component that provides descriptive markup and/or validation messaging around enclosed form fields
 */
function FormGroup({
  children,
  childDirection,
  description,
  title,
  bottomBorder,
  itemSpacing,
  validationErrors
}) {
  const descriptionMarkup =
    typeof title === "string" ? (
      <TextContainer tight>
        <Heading element="4" size="5" className="mb-1">
          {title}
        </Heading>
        {description && <Text size="6">{description}</Text>}
      </TextContainer>
    ) : (
      <>
        {title}
        {description && <Text size="6">{description}</Text>}
      </>
    );

  const validationTextMarkup = generateValidationMarkup(validationErrors);

  return (
    <Block
      alignItems="start"
      direction={["column", "column", "row"]}
      width="100"
      itemSpacing="5"
      padding="5"
      border={bottomBorder && "bottom"}
    >
      <Block direction="column" width={[100, 100, 20]} className="mw6-l">
        {descriptionMarkup}
      </Block>
      <Block direction="column" width={[100, 100, 80]}>
        <Block
          alignItems="start"
          direction={childDirection}
          itemSpacing={itemSpacing}
          style={{ maxWidth: "48rem" }}
        >
          {children}
        </Block>
        {validationTextMarkup && (
          <Block direction="column" width={[100, 100, 70]}>
            {validationTextMarkup}
          </Block>
        )}
      </Block>
    </Block>
  );
}

FormGroup.propTypes = propTypes;
FormGroup.defaultProps = defaultProps;

export default FormGroup;
