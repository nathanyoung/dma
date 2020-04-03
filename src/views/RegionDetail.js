import React, { useState } from "react";

import { FormGroup, Header } from "../components";

import {
  Block,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  FieldSelect,
  FieldText,
  Link,
  Modal
} from "@istreamplanet/pebble";

import region from "../demo/region";
import { COUNTRIES } from "../demo/country";

function RegionDetail() {
  const [addDMAModal, setAddDMAModal] = useState(false);
  const [addLocationModal, setAddLocationModal] = useState(false);
  const renderLocations = () => {
    return (
      <Card
        title="Location"
        sectioned
        headerActions={
          <Button
            size="small"
            icon="add-circle"
            primary
            onClick={() => setAddLocationModal(true)}
          >
            add
          </Button>
        }
      >
        {region.locations.map((location, index) => {
          const { country, state, city, zipCode } = location;
          return (
            <Block alignItems="center" key={index}>
              <Block flex direction={["column", "row"]}>
                <Block flex>{country}</Block>
                <Block flex>{state}</Block>
                <Block flex>{city}</Block>
                <Block flex>{zipCode}</Block>
              </Block>
              <RemoveButton name="location" />
            </Block>
          );
        })}
      </Card>
    );
  };

  const renderDesignatedMarketAreas = () => (
    <Card
      title="Designated Market Area"
      sectioned
      headerActions={
        <Button
          onClick={() => setAddDMAModal(true)}
          size="small"
          icon="add-circle"
          primary
        >
          add
        </Button>
      }
    >
      {region.designatedMarketAreas.map((dma, index) => {
        const { name } = dma;
        return (
          <Block alignItems="center" key={index}>
            <Block flex>{dma.name}</Block>
            <RemoveButton name={name} />
          </Block>
        );
      })}
    </Card>
  );

  return (
    <>
      <div id="fieldSelectTarget" style={{ zIndex: 10000 }} />
      {addDMAModal && (
        <Modal
          mobileFullScreen
          title="Add Designated Market Area"
          onRequestClose={() => setAddDMAModal(!addDMAModal)}
          showing={addDMAModal}
          footer={[
            <Button onClick={() => setAddDMAModal(!addDMAModal)}>
              Cancel
            </Button>,
            <Button primary onClick={() => setAddDMAModal(!addDMAModal)}>
              Add Designated Market Area
            </Button>
          ]}
        >
          <FieldSelect
            label="Country"
            options={COUNTRIES}
            menuPortalTarget={document.getElementById("fieldSelectTarget")}
          />
        </Modal>
      )}

      {addLocationModal && (
        <>
          <Modal
            mobileFullScreen
            title="Add Location"
            onRequestClose={() => setAddLocationModal(!addLocationModal)}
            showing={addLocationModal}
            footer={[
              <Button onClick={() => setAddLocationModal(!addLocationModal)}>
                Cancel
              </Button>,
              <Button
                primary
                onClick={() => setAddLocationModal(!addLocationModal)}
              >
                Add Location
              </Button>
            ]}
          >
            <FieldSelect
              menuPortalTarget={document.getElementById("fieldSelectTarget")}
              label="Country"
              options={COUNTRIES}
            />
          </Modal>
        </>
      )}
      <Block displayBlock padding={[3, 4, 6, "6 7"]} itemSpacing={[3, 4, 5]}>
        <Header
          title={region.name}
          breadcrumbs={
            <Breadcrumbs>
              <Link to="#">Regions</Link>
            </Breadcrumbs>
          }
        >
          <Button danger>Delete Region</Button>
        </Header>
        <Card>
          <FormGroup title="Region Info">
            <FieldText id="name" label="Name" value={region.name} />
            <Block displayBlock itemSpacing="1">
              <Block textSize="6" className="fw-700">
                Type
              </Block>
              <Block>Location</Block>
            </Block>
          </FormGroup>
          <Block padding={[3, 4, "4 5"]} justify="end">
            <ButtonGroup>
              <Button>Reset</Button>
              <Button primary>Save</Button>
            </ButtonGroup>
          </Block>
        </Card>
        {renderLocations()}
        {renderDesignatedMarketAreas()}
      </Block>
    </>
  );
}

export default RegionDetail;

function RemoveButton({ name }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      {confirmDelete && (
        <Modal
          type="danger"
          title="Confirm Removal From Region"
          onRequestClose={() => setConfirmDelete(!confirmDelete)}
          showing={confirmDelete}
          footer={[
            <Button onClick={() => setConfirmDelete(!confirmDelete)}>
              Cancel
            </Button>,
            <Button
              primary
              danger
              onClick={() => setConfirmDelete(!confirmDelete)}
            >
              Remove
            </Button>
          ]}
        >
          {`Remove ${name} from the region?`}
        </Modal>
      )}
      <Block alignItems="end">
        <Button
          icon="close"
          className="neutral-400 red-hover"
          plain
          accessibilityLabel="remove"
          onClick={() => setConfirmDelete(true)}
        />
      </Block>
    </>
  );
}
