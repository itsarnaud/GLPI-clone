const { prisma } = require('../lib/prisma');

module.exports.createCompany = async (data, user) => {
  try {
    const company = await prisma.company.create({ data: {
      ...data,
      owner: { connect: { id: user.id } }
    } });
    await prisma.user.update({ where: { id: user.id }, data: { companyId: company.id } });

    return { company };
  } catch (err) {
    console.error(err);
    return { err: 'Erreur interne.' };
  }
}

module.exports.joinCompany = async (company_id, user) => {
  try {
    await prisma.user.update({ where: { id: user.id }, data: { companyId: company_id } });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { err: 'Erreur interne.' };
  }
}


