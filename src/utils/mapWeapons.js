const mapWeapons = (weapons, weaponList) => {
  const weaponArr = weapons;
  weaponArr.forEach(mount => {
    const detailedWeapon = mount;
    const statblock = weaponList.filter(weapon => weapon.Name === mount.type)[0];
    detailedWeapon.stats = statblock;
    if (typeof detailedWeapon.mod === 'object') {
      if (detailedWeapon.mod.Qualities) {
        Object.entries(detailedWeapon.mod.Qualities).forEach(([quality, value]) => {
          const alteredQuality = detailedWeapon.stats.Qualities.split(quality);
          detailedWeapon.stats.Qualities = `${
            alteredQuality[0]
          }${quality} ${value}${alteredQuality[1].slice(2)}`;
        });
      } else {
        detailedWeapon.stats = Object.assign(detailedWeapon.stats, detailedWeapon.mod);
      }
    } else if (typeof detailedWeapon.mod === 'string') {
      detailedWeapon.mount = `${detailedWeapon.mod} ${detailedWeapon.mount}`;
    }
  });
  return weaponArr;
};
export default mapWeapons;
