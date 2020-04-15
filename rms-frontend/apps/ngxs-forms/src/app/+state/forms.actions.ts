import { UpdateFormDirty } from "@ngxs/form-plugin";

this.store.dispatch(
    new UpdateFormDirty({
      dirty: false,
      path: 'novels.newNovelForm'
    })
  );