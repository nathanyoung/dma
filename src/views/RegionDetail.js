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
  const [addDMAModal, setAddDMAModal] = useState(false);
  const [addLocationModal, setAddLocationModal] = useState(false);

  const addDma = (dma) => {
    console.log('adding dma')
    // setRegion({
    //   ...region,
    //   designatedMarketAreas: {
    //     ...region.designatedMarketAreas,
    //     ...dma
    //   }
    // })
  }

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
      overflow="initial"
      headerActions={
        <Button
          onClick={() => setAddDMAModal(!addDMAModal)}
          size="small"
          icon={addDMAModal ? null : "add-circle"}
          primary={!addDMAModal}
        >
          {addDMAModal ? 'cancel' : 'add'}
        </Button>
      }
    >
      {addDMAModal && <DMAForm handleAdd={addDma} handleClose={setAddDMAModal} />}
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