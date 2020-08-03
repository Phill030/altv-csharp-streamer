import * as alt from 'alt';
import { helpTextStreamer } from "./textlabel-streamer";

// when an object is streamed in
alt.onServer("entitySync:create", (entityId, entityType, position, currEntityData) => {
	if (currEntityData) {
		let data = currEntityData;
		if (data != undefined) {
			if (entityType == 4) {
				helpTextStreamer.addHelpText(
					+entityId, data.text, position, +entityType
				);
			}
		}
	} else {
		if (entityType == 4) {
			helpTextStreamer.restoreHelpText(+entityId);
		}
	}
});

// when an object is streamed out
alt.onServer("entitySync:remove", (entityId, entityType) => {
	if (entityType == 1) {
		helpTextStreamer.removeHelpText(+entityId);
	}
});

// when a streamed in object changes position data
alt.onServer("entitySync:updatePosition", (entityId, entityType, position) => {
	if (entityType == 4) {
		helpTextStreamer.setPosition(+entityId, position);
	}
});

// when a streamed in object changes data
alt.onServer("entitySync:updateData", (entityId, entityType, newEntityData) => {
	if (entityType == 4) {
		if (newEntityData.hasOwnProperty("text"))
			helpTextStreamer.setText(+entityId, newEntityData.text);
	}
});

// when a streamed in object needs to be removed
alt.onServer("entitySync:clearCache", (entityId, entityType) => {
	if (entityType == 4) {
		helpTextStreamer.clearHelpText(+entityId);
	}
});
