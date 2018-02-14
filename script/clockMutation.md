mutation{
  createClock(clockInput:{
  host: "ox1.modrp.com",
  companyId: "1",
  operator: "VIVO",
  imeiChip: "78974578971654",
  numberSeal: "25252525",
  moduleVersion: "Version 1",
  moduleNumber: "46546578",
  port: 3000,
  address: {
    city: "Rua São Pedro",
    street: "S B Campo",
    number: 4544,
    zipCode: "0689787984",
    state: "SP",
    longitude: 45646465,
    lagitude: -45665764
  }
	}
) {
    id
  }
}