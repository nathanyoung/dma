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
  Modal,
  useToast,
} from "@istreamplanet/pebble";

import demoRegion from "../demo/region";
import { COUNTRIES, DMA } from "../demo/country";


function RegionDetail({ region }) {
  const [addDMA, setAddDMA] = useState(false);
  const [addLocationModal, setAddLocationModal] = useState(false);

  const addDma = (dma) => {
    console.log('adding dma', dma)
  }

  const addLocation = (location) => {
    console.log('adding location', location)
  }

  const renderLocations = () => {
    return (
      <Card
        title="Location"
        headerActions={
          <Button
            onClick={() => setAddLocationModal(!addLocationModal)}
            size="small"
            icon={addLocationModal ? null : "add-circle"}
            primary={!addLocationModal}
          >
            {addLocationModal ? 'Cancel' : 'Add'}
          </Button>
        }
      >
        {addLocationModal && <LocationForm handleAdd={addLocation} handleClose={setAddLocationModal} />}
        {region.locations.map((location, index) => {
          const { country, state, city, zipCode } = location;
          return (
            <Block border={index > 0 ? 'top' : null} alignItems="center" padding={[3, '3 4', '3 5']} key={index}>
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
      overflow="initial"
      headerActions={
        <Button
          onClick={() => setAddDMA(!addDMA)}
          size="small"
          icon={addDMA ? null : "add-circle"}
          primary={!addDMA}
        >
          {addDMA ? 'Cancel' : 'Add'}
        </Button>
      }
    >
      {addDMA && <DMAForm handleAdd={addDma} handleClose={setAddDMA} />}
      {region.designatedMarketAreas.map((dma, index) => {
        const { country, areas } = dma;
        return (
          <Block border={index > 0 ? 'top' : null} margin="3 0 0 0" padding={[3, '3 4', '3 5']} alignItems="start" key={index}>
            <Block width="200px" className="fw-700">{country}</Block>
            <Block className="list-unstyled" flex direction="column" itemSpacing="2" as="ul">
              {areas.map((area, i) => (
                <li key={i}>{area.name}</li>
              ))}
            </Block>
            <RemoveButton />
          </Block>
        );
      })}
    </Card>
  );

  return (
    <>
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

RegionDetail.defaultProps = {
  region: demoRegion
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
      <Block alignSelf="center" alignItems="end">
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


function DMAForm({ handleAdd, handleClose }) {

  const toast = useToast();

  const [country, setCountry] = useState();
  const [dma, setDma] = useState();

  const handleSave = () => {
    handleAdd({
      country: country,
      areas: dma,
    })
    handleClose(false)
    toast({
      type: 'success',
      title: `Market Area Added`,
    });
  }

  return (
    <Block
      displayBlock
      margin={['3 0 0 0', '4 0 0 0', '5 0 0 0']}
      background="neutral-200"
      border="top"
    >
      <FormGroup title="Add DMA" description="Select a country and choose market areas for the region">
        <FieldSelect
          autoFocus
          id="dmaCountry"
          label="Country"
          options={COUNTRIES}
          onChange={(object) => setCountry(object.value)}
        />
        <FieldSelect
          disabled={country === undefined}
          id="dma"
          label="Designated Market Area"
          options={DMA}
          multiSelect
          showCheckbox
          placeholder="Select a country first"
          onChange={(object) => setDma(object)}
        />
      </FormGroup>
      <Block border="bottom" flex padding={[3, 4, 5]} justify="end">
        <ButtonGroup>
          <Button onClick={() => handleClose(false)}>
            Cancel
            </Button>
          <Button primary onClick={handleSave}>
            Add Designated Market Area
            </Button>
        </ButtonGroup>
      </Block>
    </Block>
  )
}

function LocationForm({ handleAdd, handleClose }) {

  const toast = useToast();

  const [country, setCountry] = useState();

  const handleSave = () => {
    handleAdd({
      country: country,
    })
    handleClose(false)
    toast({
      type: 'success',
      title: `Location Area Added`,
    });
  }

  return (
    <Block
      displayBlock
      margin={['3 0 0 0', '4 0 0 0', '5 0 0 0']}
      background="neutral-200"
      border="top"
    >
      <FormGroup title="Add Location" description="Define the location area">
        <Block flex width="100%" direction={['column', 'row']} itemSpacing="3">
          <FieldSelect
            autoFocus
            id="country"
            label="Country"
            options={COUNTRIES}
            onChange={(object) => setCountry(object.value)}
          />
          <FieldSelect
            id="state"
            label="State/Province"
            options={COUNTRIES}
            onChange={(object) => setCountry(object.value)}
          />
        </Block>
        <Block flex width="100%" direction={['column', 'row']} itemSpacing="3">
          <FieldSelect
            id="city"
            label="City"
            options={COUNTRIES}
            onChange={(object) => setCountry(object.value)}
          />
          <FieldText
            id="postalCode"
            label="Postal/Zip Code"
            options={COUNTRIES}
            onChange={(object) => setCountry(object.value)}
          />
        </Block>
      </FormGroup>
      <Block border="bottom" flex padding={[3, 4, 5]} justify="end">
        <ButtonGroup>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button primary onClick={handleSave}>Location</Button>
        </ButtonGroup>
      </Block>
    </Block>
  )
}